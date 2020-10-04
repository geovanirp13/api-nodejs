const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

//http://localhost:3000/products
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

//http://localhost:3000/products/slug
exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data); 
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

//http://localhost:3000/products/admin/id
exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data); 
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

//http://localhost:3000/products/tags/tag
exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data); 
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

//http://localhost:3000/products
exports.post = async (req, res, next) => {
  const contract = new  ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O descrição deve conter pelo menos 3 caracteres');

  //Se os dados forem validados
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return
  };

  try {
    await repository.post(req.body);
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};

//http://localhost:3000/products/id
exports.put = async (req, res, next) => {
  const contract = new  ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O descrição deve conter pelo menos 3 caracteres');

  //Se os dados forem validados
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return
  };

  try {
    await repository.put(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};
//http://localhost:3000/products/id
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: 'Produto deletado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
};