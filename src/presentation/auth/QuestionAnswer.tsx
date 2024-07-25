import React, { useState } from "react";
import {
  useGetQuestionsQuery,
  useGetUserTokenQuery,
  useUpdateUserQuestionsMutation,
} from "../../services/auth-service";
import Loader from "../../components/Loader";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const QuserId = location.state?.userId;
  const { data: userTokenResponse } = useGetUserTokenQuery(QuserId);
  const userToken = userTokenResponse?.data;
  if (userToken?.user) {
    const { id, firstName, lastName, email, hostel, gender, groups } = userToken.user;
    sessionStorage.setItem("user_id", id);
    sessionStorage.setItem("first_name", firstName);
    sessionStorage.setItem("last_name", lastName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("hostel", hostel);
    sessionStorage.setItem("gender", gender);
    sessionStorage.setItem("roles", groups[0].name)
    const { access } = userToken.token;
    sessionStorage.setItem("access_token", access);
  }
  const { data: response, isLoading } = useGetQuestionsQuery();
  const questions = response?.data || [];

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
        navigate("/rooms/view-room-types");
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

  const optionLabels = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];

  return (
    <div>
      <section className="bg-white dark:bg-slate-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-8 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
            Personality Profile Completion
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
                          // <input
                          //   type="text"
                          //   placeholder="Your answer"
                          //   required
                          //   className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          //   onChange={(e) =>
                          //     handleInputChange(element.id, e.target.value)
                          //   }
                          // />
                          <textarea
                            placeholder="Your answer"
                            required
                            id="description"
                            onChange={(e) =>
                              handleInputChange(element.id, e.target.value)
                            }
                            className="py-4 px-3 block w-full bg-[#f0efef] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
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
                className="px-8 py-2 mt-2 border dark:border-white bg-gray-800 text-white rounded-full hover:bg-gray-700"
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
