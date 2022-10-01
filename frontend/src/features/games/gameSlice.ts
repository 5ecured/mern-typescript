import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Game } from "../../interfaces/Game";

interface GameState {
    games: Game[] | null
    loading: boolean
    singleGame: Game | null
    errors: any
}

const initialState: GameState = {
    games: [],
    singleGame: null,
    loading: false,
    errors: null
}

export const getGames = createAsyncThunk<Game[]>(
    'games/getGames', //Usually <the name of the slice>/<the name of this function>
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/games')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//Below, Object means we are PASSING that type of data, Game means we are GETTING that type of data
export const createGame = createAsyncThunk<Object, Game>(
    'games/createGame',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8080/api/games/game', data)
            thunkAPI.dispatch(getGames())
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload
        }
    },
    extraReducers: (builder) => {
        //These 'addCase' are like if statements
        builder.addCase(getGames.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getGames.fulfilled, (state, action) => {
            state.games = action.payload
            state.loading = false
        })
        builder.addCase(getGames.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
    }
})

export const { setGames } = gameSlice.actions
export default gameSlice.reducer
