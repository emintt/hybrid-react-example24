import { useRef } from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { useCommentStore } from "../store";
import { MediaItemWithOwner } from "../types/DBtypes";

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, addComment} = useCommentStore();
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);

  const initValues = {comment_text: ''};
  const doComment = () => {
    if (!user) {
      return
    }
    addComment({
      comment_text: inputs.comment_text,
      media_id: item.media_id,
      user_id: user.user_id,
      username: user.username,
    });
    // resetoi lomake, formRef.current päästä formille
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const {handleSubmit, handleInputChange, inputs} = useForm(doComment, initValues);

  // tää tulostaa koko ajan, koska se renderoidaan koko ajan kun state muuttuu,
  // tässä tapauksessa inputs muuttuu, niin se renderoidaan uudestaan
  console.log(comments);
  return (
    <>
      {user && (
        <>
          <h3 className="text-3xl">Post Comment</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex w-4/5">
              <label className="w-1/3 p-6 text-end" htmlFor="comment">
                Comment
              </label>
              <input
                className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
                name="comment_text"
                type="text"
                id="comment"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-4/5 justify-end">
              <button
                className="m-3 w-1/3 rounded-md bg-slate-700 p-3"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>On {new Date(comment.created_at!).toString()}</p>
            <p>User {comment.username}</p>
            <p>Commented {comment.comment_text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Comments
