import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.modlel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontEnd
  // Validation - not Empty
  //Check if user already Exists: username , email
  //chekc for images , check for avatar
  //Upload them to the cloudinary, avatar
  //Create user Object-Create entry  in db
  //Remove password and refrest token filed from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;
  // console.log(email);
  if (
    [fullName, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Full name is Required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with Email or username already Exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regestring the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registred Successfully"));
});

export { registerUser };
