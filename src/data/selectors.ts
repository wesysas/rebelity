import { createSelector } from 'reselect';
import { Product } from '../models/Pos';

import { IGlobalState } from './coreTypes';

const getUsers = (state: IGlobalState) => state.ClockInState.clockInUsers;
const getIdParam = (state: IGlobalState) => state.ClockInState.currentUserId;

export const getUsersById = createSelector(
  getUsers, getIdParam,
  (users, id) => {
    
    let cnt = users.length;
    for (var i = 0; i< cnt; i++) {
      if (users[i].userId == id) {
        return users[i];
      }
    }
         
    return null;
  }
);

const prodCategories = (state: IGlobalState) => state.PosState.prodCategories;
const products = (state: IGlobalState) => state.PosState.products;
const getKeyword = (state: IGlobalState) => state.PosState.searchName;
const getProductId = (state: IGlobalState) => state.PosState.curProdId;

export const getProductById = createSelector(
  products, getProductId, 
  (prods, prodId) => {
    var filteredProds = prods.filter(function( p ) {
      return p.ProductId == prodId;
    });

    if (filteredProds.length > 0) {
      return filteredProds[0];
    }
         
    return null;
  }
);

export const getProducts = createSelector(
  prodCategories, products, getKeyword, getProductById,
  (cats, prods, keyword, curProd) => {
    const selectedCats = cats.filter(function( c ) {
      return c.selected == true;
    });

    var filteredProds:Product[] = [];
    if (selectedCats.length > 0) {
      filteredProds = prods.filter(function( p ) {
        if (keyword == "") {
          const pCats = selectedCats.filter(function(pC) {
            return pC.categoryId == p.CategoryId;
          });

          return pCats.length > 0;
        } else {
          const pCats = selectedCats.filter(function(pC) {
            return pC.categoryId == p.CategoryId && p.Name.indexOf(keyword) >= 0;
          });

          return pCats.length > 0;
        }
      });
    } else {
      filteredProds = prods.filter(function( p ) {
        if (keyword == "") {
          return true;
        } else {
          var prodName = p.Name.toLowerCase();
          var keyName = keyword.toLowerCase();
          return prodName.indexOf(keyName) >= 0;
        }
      });
    }

    if (curProd != null) {
      if (curProd.Variations.length > 0 || curProd.Options.length > 0) {
        filteredProds = [];
      }
    }
         
    return filteredProds;
  }
);

