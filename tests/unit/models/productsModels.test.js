const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModels');
const db = require('../../../models/connection');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('Testa se dispara um erro caso productModel.getAll retorna um erro', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.getAll()).to.eventually.be.rejected;
    });
    it('Testa se retorna vazio caso o productModel.getAll retorna vazio', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      chai.expect(productsModel.getAll()).to.eventually.be.undefined;
    });
    it('Testa se retorna algo caso o productModel.getAll retorne algo', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      chai.expect(productsModel.getAll()).to.eventually.deep.equal({});
    });
  });

  describe('getById', () => {
    it('Testa se dispara um erro caso productModel.getById retorna um erro', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.getById(1)).to.eventually.be.rejected;
    });
    it('Testa se retorna vazio caso o productModel.getById retorna vazio', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      chai.expect(productsModel.getById(1)).to.eventually.be.undefined;
    });
    it('Testa se retorna algo caso o productModel.getById retorne algo', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      chai.expect(productsModel.getById(1)).to.eventually.deep.equal({});
    });
  });

  describe('add', () => {
    it('Testa se dispara um erro caso o banco de dados retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.add('teste')).to.eventually.be.rejected;
    });
    it('Testa se retorna um objeto se o banco de dados retornar um objeto', () => {
      const item = {
        name: 'teste',
        id: 0,
      }
      sinon.stub(db, 'execute').resolves([{ insertId: 0 }]);
      chai.expect(productsModel.add('teste')).to.eventually.deep.equal(item);
    });
  })
});