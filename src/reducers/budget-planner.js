const { UPDATE_PLANNER } = require("@/actions/budget-planner");

const initialState = {
  planning: {
    showerSelected: false,
    bathSelected: false,

    showerType: "",
    bathType: "",

    showerPrice: 0,
    bathPrice: 0,

    demolitionWorkType: "",
    demolitionWorkPrice: 0,

    bathFurnitureType: "",
    bathFurniturePrice: 0,

    electricityType: "",
    electricityPrice: 0,

    plumberType: "",
    plumberPrice: 0,

    bathroomHeatingType: "",
    bathroomHeatingPrice: 0,

    toiletType: "",
    toiletPrice: 0,

    tilesType: "",
    tilesPrice: 0,

    tilesTotalPrice: 0,
    m2: 0,
    bathRoomFloorM2: 0,
    length: 0,
    with: 0,
    height: 0
  },
  total: 0
};

export default function budgetPlannerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLANNER: {
      let newShowerPrice = state?.planning?.showerPrice;
      let showerType = state?.planning?.showerType;

      let newBathPrice = state?.planning?.bathPrice;
      let bathType = state?.planning?.bathType;

      let demolitionWorkType = state?.planning?.demolitionWorkType;
      let demolitionWorkPrice = state?.planning?.demolitionWorkPrice;

      let bathFurniturePrice = state?.planning?.bathFurniturePrice;
      let bathFurnitureType = state?.planning?.bathFurnitureType;

      let electricityType = state?.planning?.electricityType;
      let electricityPrice = state?.planning?.electricityPrice;

      let plumberType = state?.planning?.plumberType;
      let plumberPrice = state?.planning?.plumberPrice;

      let bathroomHeatingPrice = state?.planning?.bathroomHeatingPrice;
      let bathroomHeatingType = state?.planning?.bathroomHeatingType;

      let toiletType = state?.planning?.toiletType;
      let toiletPrice = state?.planning?.toiletPrice;

      let tilesType = state?.planning?.tilesType;
      let tilesPrice = state?.planning?.tilesPrice;

      let tilesTotalPrice = state?.planning?.tilesTotalPrice;
      let m2 = state?.planning?.m2;
      let bathRoomFloorM2 = state?.planning?.bathRoomFloorM2;
      let length = state?.planning?.length;
      let width = state?.planning?.width;
      let height = state?.planning?.height;

      if (action?.data?.showerSelected === false) {
        newShowerPrice = 0;
        showerType = "";
      }
      if (action?.data?.showerType) { 
        newShowerPrice = action?.data?.showerPrice;
        showerType = action?.data?.showerType;
      }

      if (action?.data?.bathSelected === false) {
        newBathPrice = 0;
        bathType = "";
      }
      if (action?.data?.bathType) { 
        newBathPrice = action?.data?.bathPrice;
        bathType = action?.data?.bathType;
      }

      if (action?.data?.demolitionWorkType) {
        demolitionWorkPrice = action?.data?.demolitionWorkPrice;
        demolitionWorkType = action?.data?.demolitionWorkType; 
      }

      if (action?.data?.bathFurnitureType) { 
        bathFurniturePrice = action?.data?.bathFurniturePrice;
        bathFurnitureType = action?.data?.bathFurnitureType;
      }

      if (action?.data?.electricityType) {
        electricityType = action?.data?.electricityType;
        electricityPrice = action?.data?.electricityPrice;
      }

      if (action?.data?.plumberType) {
        plumberType = action?.data?.plumberType;
        plumberPrice = action?.data?.plumberPrice;
      }

      if (action?.data?.bathroomHeatingType) { 
        bathroomHeatingPrice = action?.data?.bathroomHeatingPrice;
        bathroomHeatingType = action?.data?.bathroomHeatingType;
      }

      if (action?.data?.toiletType) { 
        toiletPrice = action?.data?.toiletPrice;
        toiletType = action?.data?.toiletType;
      }

      if (action?.data?.tilesType) { 
        tilesType = action?.data?.tilesType;
        tilesPrice = action?.data?.tilesPrice;
      }

      // TODO: When switch to No - the number is still there
      if (Number.isInteger(action?.data?.tilesTotalPrice)) {
        tilesTotalPrice = action?.data?.tilesTotalPrice;
        m2 = action?.data?.m2;
        bathRoomFloorM2 = action?.data?.bathRoomFloorM2;
        length = action?.data?.length;
        width = action?.data?.width;
        height = action?.data?.height;
      }

      return {
        ...state,
        planning: {
          ...state.planning,
          ...action?.data,
          showerPrice: newShowerPrice, 
          bathPrice: newBathPrice,
          showerType,
          bathType,
          demolitionWorkPrice,
          demolitionWorkType,
          bathFurniturePrice,
          bathFurnitureType,
          electricityType,
          electricityPrice,
          plumberType,
          plumberPrice,
          bathroomHeatingPrice,
          bathroomHeatingType,
          toiletPrice,
          toiletType,
          tilesTotalPrice,
          tilesPrice,
          tilesType,
          length,
          width,
          height,
          m2,
          bathRoomFloorM2
        },
        total: (
          newShowerPrice + newBathPrice + demolitionWorkPrice + bathFurniturePrice + electricityPrice + 
          plumberPrice + bathroomHeatingPrice + toiletPrice + tilesTotalPrice
        )
      };
    }
    default: {
      return state;
    }
  }
};