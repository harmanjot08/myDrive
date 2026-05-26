import Header from "../Header/Header";
import MainSection from "../MainSection/MainSection";
import Uploader from "../Uploader/Uploader";
import { useAppSelector } from "../../hooks/store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import socket from "../../utils/socket";
import { useQueryClient } from "react-query";

const Homepage = () => {
  const showUploader = useAppSelector(
    (state) => state.uploader.uploads.length !== 0
  );

  const user = useAppSelector((state) => state.user.user);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id.toString());
    }

    socket.on("file-uploaded", () => {
      queryClient.invalidateQueries("quickFiles");
      queryClient.invalidateQueries("files");
    });

    socket.on("file-deleted", () => {
      queryClient.invalidateQueries("quickFiles");
      queryClient.invalidateQueries("files");
    });

    return () => {
      socket.off("file-uploaded");
      socket.off("file-deleted");
    };
  }, []);

  return (
    <div>
      <div className="">
        <Header />
        <div className="flex space-between">
          <MainSection />
          {showUploader && <Uploader />}
        </div>
      </div>

      <ToastContainer position="bottom-left" pauseOnFocusLoss={false} />
    </div>
  );
};

export default Homepage;
