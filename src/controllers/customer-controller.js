const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
  const contract = new  ValidationContract();
  contract.isEmail(req.body.email, 'E-mail inválido!');

  //Se os dados forem validados
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return
  };

  try {
    await repository.post({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });
    res.status(201).send({
      message: 'Cliente cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data); 
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

exports.authenticate  = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    if (!customer) {
      res.status(400).send({ message: 'Usuário ou senha inválido!'});
    }

    const token = await authService.generateToken({
      email: customer.email,
      name: customer.name
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};