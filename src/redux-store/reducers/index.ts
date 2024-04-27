import { dataReducers } from "redux-store/slices/data";

const Reducers = {};

for (const reducer in dataReducers) {
  Reducers[reducer] = dataReducers[reducer];
}

export default Reducers;
