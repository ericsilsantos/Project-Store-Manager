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
});