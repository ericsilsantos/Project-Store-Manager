const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productService = require('../../../services/produtcsServices');
const productController = require('../../../controllers/productsController');

chai.use(chaiAsPromised);

describe('controller/productController', () => {
  beforeEach(sinon.restore);
  
  describe('getAll', () => {
    it('Deve retornar um erro caso o services.getAll retorne um erro', () => {
      sinon.stub(productService, 'getAll').rejects();
      chai.expect(productController.getAll({}, {})).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso o services.getAll retorne um objeto', () => {
      sinon.stub(productService, 'getAll').resolves([[{}]]);
      chai.expect(productController.getAll({}, {})).to.eventually.deep.equal({});
    });
  });
  describe('getById', () => {
    it('Deve retornar um erro caso o services.getById retorne um erro', () => {
      sinon.stub(productService, 'getById').rejects();
      chai.expect(productController.getById({}, {})).to.eventually.be.rejected;
    });
    it('Deve retornar um objeto caso o services.getById retorne um objeto', () => {
      sinon.stub(productService, 'getById').resolves([[{}]]);
      chai.expect(productController.getById({ params:{id: 1 }}, {})).to.eventually.deep.equal({});
    });
    it('Deve retornar uma mensagem caso o services.getById retorne um array vazio', () => {
      sinon.stub(productService, 'getById').resolves([]);
      chai.expect(productController.getById({ params: { id: 99 } }, {})).to.eventually.deep.equal({});
    })
  });
  describe('add', () => {
    it('Deve retornar um erro caso o services.validationName retorne um erro', () => {
      sinon.stub(productService, 'validationName').rejects();
      chai.expect(productController.add()).to.be.eventually.rejected;
    });
    it('Deve retornar um erro caso o services.add retorne um erro', () => {
      sinon.stub(productService, 'validationName').resolves({});
      sinon.stub(productService, 'add').rejects();
      chai.expect(productController.add({}, {})).to.be.eventually.rejected;
    });
    it('Deve retornar um objeto caso o service.add retorne um objeto', async () => {
      const result = { name: 'teste', id: 1 };
      const next = sinon.stub().returns();
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productService, 'validationName').resolves({ name: 'teste'});
      sinon.stub(productService, 'add').resolves(result);
      await productController.add({}, res, next);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
    it('', () => { });
    it('', () => { });
  });
});