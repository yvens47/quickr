import Friend from "./Friend";

const SuggestionsFriends = ({ friends }) => {
  return (
    <>
      {friends &&
        friends.map(friend => (
          // friend

          <div className="friend-sugestion" key={friend.id}>
            {friend.name}
          </div>
        ))}
    </>
  );
};

export default SuggestionsFriends;
