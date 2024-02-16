import { create } from "zustand";
import { Comment } from "./types/DBtypes";

// voi lisätä update, delete...
// lisää username kommentille, partial: kaikki ei ole pakko laitta es. id, created at ...
// addComment:

// jos ei halua toista itse
type CommentWithUserName =  Partial<Comment & {username: string}>;

type CommentStore = {
  comments: CommentWithUserName[];
  // set comment: lähetettään kommentti bacendiin, talennetaan tietokantaam
  // haetaan päivitetty kommentti tietokannasta, sit set komment päivitä sitä
  setComments: (comment: Partial<Comment & {username: string}>) => void;
  addComment: (comment: Partial<Comment & {username: string}>) => void;
};

// create CommentStore, parameter set: set on funktio mitää muuttiin stateti arvo
export const useCommentStore = create<CommentStore>((set) => ({
  // varsinainen state
  comments: [],
  setComments: (comments) =>
    set(() => ({
      comments: comments,
    })),
  addComment: (comment) =>
    set((state) => ({
      comments: [
        // haetaan comments from state ja tehdään uusi kommentti
        ...state.comments,
        {
          comment_id: state.comments.length + 1, // This is a temporary solution
          comment_text: comment.comment_text,
          user_id: comment.user_id,
          media_id: comment.media_id,
          created_at: new Date(),
          username: comment.username,
        },
      ],
    })),
}));
