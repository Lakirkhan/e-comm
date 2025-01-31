import { call, put, takeEvery } from "redux-saga/effects";
import { PRODUCT_LIST } from "../redux/constant";

function* fetchProducts() {
  const response = yield call(fetch, "https://fakestoreapi.com/products");
  const data = yield response.json();
  yield put({ type: "SET_PRODUCT_LIST", payload: data });
}

export default function* productSaga() {
  yield takeEvery(PRODUCT_LIST, fetchProducts);
}