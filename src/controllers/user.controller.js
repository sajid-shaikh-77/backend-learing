import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiErrorHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    const { username,
        email,
        fullname,
        password } = req.body

    // if (fullname === "") {
    //     throw new ApiError(400,'fullname is required');

    // }
    if (
        [username, email, fullname,
            avatar, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");

    }

    const existedUser = User.findOne({
        $or: [{ username },
        { email }
        ]
    })

    if (existedUser) {
        throw new ApiError(409, "User already Exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");

    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar is required");

    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage ? coverImage.url : "",
        email,
        password,
        username: username.toLowercase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating a user");
        
    }

    return res.status(201).json(

       new ApiResponse(
        200,
        createdUser,
        "User Register successfully "
       )
    )
})

export { registerUser }