import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../services/categorieService";
import { addCategorie } from "../services/categorieService";
import { delCategorie } from "../services/categorieService";
import { editCategorie } from "../services/categorieService";
import { fetchCategorieById } from "../services/categorieService";
export const getCategories = createAsyncThunk(
    "categorie/getCategories",
    async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
    const res = await fetchCategories();
    return res.data;
    }
    catch (error) {
    return rejectWithValue(error.message);
    }
    });

    export const createCategorie = createAsyncThunk(
      "categorie/createCategorie",
      async (categorie, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      const res= await addCategorie(categorie);
      return res.data
      }
      catch (error) {
      return rejectWithValue(error.message);
      }
      });

    
    export const deleteCategorie = createAsyncThunk(
      "categorie/deleteCategorie",
      async (id,thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      await delCategorie(id);
      return id ;
      }
      catch (error) {
      return rejectWithValue(error.message);
      }
      });
      export const updateCategorie = createAsyncThunk(
        "categorie/updateCategorie",
        async (categorie, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
        const res= await editCategorie(categorie);
        return res.data
        }
        catch (error) {
        return rejectWithValue(error.message);
        }
        }
        );
        export const findCategorieByID = createAsyncThunk(
          "categorie/findCategorieByID",
          async (id,thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          try{
            const res = await fetchCategorieById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});
    export const categorieSlice = createSlice({
        name: 'categorie',
        initialState:{
        categories:[],
        categorie:{},
        isLoading: false,
        success:null,
        error:null,
        },

       
      
            
        extraReducers: (builder) => {
            //get categories
            builder
            .addCase(getCategories.pending, (state, action) => {
            state.isLoading=true;
            state.error=null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading=false;
            state.error = null;
            state.categories=action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
            state.isLoading=false;
            state.error=action.payload;
            console.log("impossible de se connecter au serveur")
            
            }) 

           //Modification categorie
.addCase(updateCategorie.pending, (state, action) => {
  state.isLoading=true;
  state.error=null;
  state.success=null;
  })
  .addCase(updateCategorie.fulfilled, (state, action) => {
  state.categories = state.categories.map((item) =>
  item._id === action.payload._id ? action.payload : item
  );
  state.isLoading=false;
  state.error=null;
  state.success=action.payload;
  })
   
            //Delete categorie

            .addCase(deleteCategorie.pending, (state, action) => {
              state.isLoading=true;
  state.error=null;
  })
  .addCase(deleteCategorie.fulfilled, (state, action) => {
  state.isLoading=false;
  state.error=null;
  state.categories=state.categories.filter((item)=> item._id!==action.payload)
  })
  .addCase(deleteCategorie.rejected, (state, action) => {
  state.isLoading=false;
  state.error=action.payload;
  })  
  
  
//insertion categorie
.addCase(createCategorie.pending, (state, action) => {
  state.isLoading=true;
  state.error=null;
  state.success=null;
  })
  .addCase(createCategorie.fulfilled, (state, action) => {
  state.categories.push(action.payload);
  state.isLoading=false;
  state.error=null;
  state.success=action.payload;
  })
  .addCase(createCategorie.rejected, (state, action) => {
  state.isLoading=false;
  state.error=action.payload;
  state.success=null;
  })
  //Fectch categorie
.addCase(findCategorieByID.pending, (state, action) => {
  state.isLoading = true
  state.error=null;
  })
  .addCase(
    findCategorieByID.fulfilled,(state, action) => {
  state.isLoading = false
  state.error = null
  state.categorie=action.payload;
  })

          }
        })
      
        export default categorieSlice.reducer;