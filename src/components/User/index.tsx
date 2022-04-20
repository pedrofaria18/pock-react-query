import { useUserQuery } from "../../contexts/useUserQuery";
import "./style.css"

export const User = () => {
  //const { user, handleClickNextButton, handleClickPrevButton } = useUser();
  const { user, handleClickNextButton, handleClickPrevButton } = useUserQuery();

  return (
    <section>
      <img src={user.avatar} alt={`Avatar do ${user.first_name}`} />

      <p>
        {user.first_name} {user.last_name}
      </p>

      <p>Email: {user.email}</p>

      <div>
        <button onClick={handleClickPrevButton}>Prev</button>
        <button onClick={handleClickNextButton}>Next</button>
      </div>
    </section>
  );
};
