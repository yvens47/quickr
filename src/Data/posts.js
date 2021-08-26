export const data = [
  {
    id: "12345643",
    postType: "video",
    video:
      "https://player.vimeo.com/external/442317687.sd.mp4?s=612d4db318c33ac102858410c2d38f1219336c74&profile_id=165&oauth2_token_id=57447761",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "08-22-2021",
    user: {
      id: "123456",
      name: "Beeplet",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },

    likes: 50,
    comments: [{ user: "678", text: "Wowo this is great" }],
    date: "08-21-2021"
  },
  {
    id: "12345643",
    postType: "photo",
    image:
      "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "08-22-2021",
    user: {
      id: "123456",
      name: "Beeplet",
      image:
        "https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
    },
    likes: 90,
    comments: [
      { user: "678", text: "Wowo this is great", username: "Craig" },
      { user: "6788", text: "Wowo this is great", username: "Peter" }
    ],
    date: "08-22-2021"
  }
];
