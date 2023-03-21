import React, { useEffect } from "react";
import { toast } from "react-toastify";

import LoginVote from "../vote/components/LoginVote";

export default function Launch() {
  useEffect(() => {
    let id1 = toast.info("This is Preview Mode", { autoClose: false });
    let id2 = toast.info("Your voter name is test", { autoClose: false });
    let id3 = toast.info("Your voter key is test", { autoClose: false });
    return () => {
      toast.dismiss(id1);
      toast.dismiss(id2);
      toast.dismiss(id3);
    };
  }, []);

  return (
    <div className="LaunchWrapper">
      <LoginVote />
    </div>
  );
}
