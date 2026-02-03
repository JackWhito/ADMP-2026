import User from "../models/user.model.js";

export async function getUsers(req, res) {
    try {
        const currentUserId=req.user.id;
        const currentUser = req.user;

        const others = await User.find({
            $and: [
                {_id: {$ne: currentUserId}},
                {_id: {$nin: currentUser.friends}},
                {isVerified: true},
            ]
        });
        res.status(200).json(others);
    } catch (error) {
        console.error("Error in getUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName email avatar");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}