const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Joi = require("joi");
const productModel = require('../../../models/productsModels');
const productService = require('../../../services/produtcsServices');

chai.use(chaiAsPromised);

describe('service/productsService', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('Deve retornar um erro caso model.getAll retorne um erro', () => {
      sinon.stub(productModel, 'getAll').rejects();
      chai.expect(productService.getAll()).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso model.getAll retorne um objeto', () => {
      sinon.stub(productModel, 'getAll').resolves([[{}]]);
      chai.expect(productService.getAll()).to.eventually.deep.equal({});
    });
  });
  describe('getById', () => {
    it('Deve retornar um erro caso model.getById retorne um erro', () => {
      sinon.stub(productModel, 'getById').rejects();
      chai.expect(productService.getById(1)).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso model.getById retorne um objeto', () => {
      sinon.stub(productModel, 'getById').resolves([[{}]]);
      chai.expect(productService.getById(1)).to.eventually.deep.equal({});
    });
  });
  describe('add', () => {
    it('Deve retornar um erro caso model.add retorne um erro', () => {
      sinon.stub(productModel, 'add').rejects();
      chai.expect(productService.add()).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso model.add retorne um erro', () => {
      sinon.stub(productModel, 'add').resolves({});
      chai.expect(productService.add('teste')).to.eventually.deep.equal({});
    });
  })
  describe('validationName', () => {
    const schema = Joi.object({
      name: Joi.string().required().min(5),
  });
    it('Deve retornar um erro caso schema retorne um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(productService.validationName({ name: 'teste' })).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso schema retorne um objeto', () => {
      sinon.stub(schema, 'validateAsync').resolves({});
      chai.expect(productService.validationName({ name: 'teste' }))
        .to.eventually.deep.equal({});
    });
  })
})