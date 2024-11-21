import React, { useState, useEffect } from "react";
import { TodoForm, TodoInput } from "../../styles/todo.style";
import Button from "../common/Button/Button";
import { TaskInputProps } from "../../interface/Todo/index";
import { ADD_TASK_LABEL, UPDATE_TASK_LABEL } from "../../constants/labels";
import { ADD_TASK_PLACEHOLDER } from "../../constants/placeholders";
import { uploadImageToS3 } from "../../../aws-s3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskInput: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  onSubmit,
  editingTask,
  setTaskImage,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [expectedTime, setExpectedTime] = useState<string>(''); 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleExpectedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedTime(e.target.value);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById("images") as HTMLInputElement;
    if (fileInput && e.dataTransfer?.files[0]) {
      fileInput.files = e.dataTransfer.files;
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Uploading image...");
    let imageUrl: string | null = null;

    if (image) {
      try {
        imageUrl = await uploadImageToS3(image);
        setTaskImage(imageUrl);
        setImage(null); 
        const fileInput = document.getElementById("images") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; 
        }
        toast.success("Image uploaded successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Error uploading image: ${err.message}`);
        } else {
          console.error('Error uploading image: An unknown error occurred');
        }
        toast.error("Error uploading image.");
        setTaskImage(null);
      }
    } else {
      setTaskImage(null);
    }

    const todoData = {
      task: newTask,
      expectedTime,
      imageUrl,
    };

    console.log("Form Data:", todoData);

    onSubmit(todoData);
  };

  useEffect(() => {
    const dropContainer = document.getElementById("dropcontainer");

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDragEnter = () => {
      dropContainer?.classList.add("drag-active");
    };

    const handleDragLeave = () => {
      dropContainer?.classList.remove("drag-active");
    };

    if (dropContainer) {
      dropContainer.addEventListener("dragover", handleDragOver);
      dropContainer.addEventListener("dragenter", handleDragEnter);
      dropContainer.addEventListener("dragleave", handleDragLeave);
      dropContainer.addEventListener("drop", handleDrop);

      return () => {
        dropContainer.removeEventListener("dragover", handleDragOver);
        dropContainer.removeEventListener("dragenter", handleDragEnter);
        dropContainer.removeEventListener("dragleave", handleDragLeave);
        dropContainer.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  return (
    <>
      <TodoForm onSubmit={handleSubmit}>
        <TodoInput
          type="text"
          width={"97%"}
          placeholder={ADD_TASK_PLACEHOLDER}
          value={newTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask(e.target.value)
          }
          required
        />
        <input
          type="datetime-local"
          placeholder="Expected time of completion"
          value={expectedTime}
          onChange={handleExpectedTimeChange}
        />
        <label htmlFor="images" className="drop-container" id="dropcontainer">
          <span className="drop-title">Drop files here</span>
          or
          <input
            type="file"
            id="images"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
        </label>
        <Button type="submit" buttonStyle="primary" width="auto">
          {editingTask ? UPDATE_TASK_LABEL : ADD_TASK_LABEL}
        </Button>
      </TodoForm>
      <ToastContainer />
    </>
  );
};

export default TaskInput;