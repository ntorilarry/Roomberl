import React, { useState } from "react";
import {
  useGetQuestionsQuery,
  useUpdateUserQuestionsMutation,
} from "../../services/auth-service";
import Loader from "../../components/Loader";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionAnswer = () => {
  const navigate = useNavigate();
  const [code_name, setCode_name] = useState<string | null>(
    sessionStorage.getItem("code_name")
  );
  const location = useLocation();
  const { data: response, isLoading } = useGetQuestionsQuery();

  const questions = response?.data || [];

  const QuserId = location.state?.userId;

  const [updateQuestion, { isLoading: selectLoading }] =
    useUpdateUserQuestionsMutation();

  const [answers, setAnswers] = useState({});

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionRequest = {
        responses: questions.map((item) => ({
          id: item.id,
          question: item.question.map((element) => {
            const answer = answers[element.id];
            if (element.option.length > 0) {
              return {
                id: element.id,
                option: element.option.map((data) => ({
                  text: data.text,
                  chosen: data.text === answer,
                })),
              };
            } else {
              return {
                id: element.id,
                option: [
                  {
                    text: answer,
                    chosen: true,
                  },
                ],
              };
            }
          }),
        })),
      };

      const response = await updateQuestion({
        body: questionRequest,
        userId: QuserId || "",
      });
      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        navigate(`/auth/login/${code_name}`);
      } else {
        if (typeof data === "object" && data !== null) {
          const errorMessages = Object.entries(data)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return `${key}: ${value.join(", ")}`;
              }
              return `${key}: ${value}`;
            })
            .join(", ");
          toast.error(errorMessages);
        } else {
          toast.error(data);
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const optionLabels = ["A", "B", "C", "D", "E", "F", "G"];

  return (
    <div>
      <section className="bg-white dark:bg-slate-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-8 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
            Questions and Answers
          </h2>
          <form onSubmit={handleFormSubmit}>
            {questions.map((item) => (
              <div key={item.id}>
                <h2 className="mb-2 text-xl tracking-tight font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h2>
                <div className="grid pt-3 text-left border-t border-gray-300 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                  {item.question.map((element) => (
                    <div key={element.id}>
                      <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-base font-medium text-gray-900 dark:text-white">
                          {element.text}
                        </h3>
                        {element.option.length > 0 ? (
                          element.option.map((data, index) => (
                            <div
                              className="flex items-center mb-4"
                              key={data.id}
                            >
                              <input
                                id={`option-${data.id}`}
                                type="radio"
                                value={data.text}
                                name={`question-${element.id}`}
                                required={element.isRequied}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={() =>
                                  handleInputChange(element.id, data.text)
                                }
                              />
                              <label
                                htmlFor={`option-${data.id}`}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {`${optionLabels[index]}. ${data.text}`}
                              </label>
                            </div>
                          ))
                        ) : (
                          <input
                            type="text"
                            placeholder="Your answer"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            onChange={(e) =>
                              handleInputChange(element.id, e.target.value)
                            }
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-gray-300  flex justify-end w-full">
              <button
                type="submit"
                className="px-8 py-2 mt-2  bg-gray-800 text-white rounded-full hover:bg-gray-700"
                disabled={selectLoading}
              >
                Finish
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default QuestionAnswer;
