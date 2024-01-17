import { Modal } from "../modal";
import UserQuestion from "./userQuestion";
import BotResponse from "./botResponse_erin_develop";
import { mockData1, mockData2, mockData3, mockData4 } from "./mockData";
import styles from "../../styles/chatBox.module.css";
import { loadedDocuments } from "../settings";
export const TipsModal = (props) => {
  const closeModal = props.closeModal;
  const exampleQuestions1Handler = props.exampleQuestions1Handler;
  return (
    <Modal onClose={closeModal}>
      <div className={`${styles.tipsMessage}`}>
        <p>
          Hi! I’ve put together some helpful hints when asking me questions. If
          you would also like to see some examples, click{" "}
          <a className={`${styles.link}`} onClick={exampleQuestions1Handler}>
            here
          </a>
          .
        </p>
      </div>
      <div className={`${styles.tips}`}>
        <div className={`${styles.doBox}`}>
          <div className={`${styles.doCircle}`}>Do</div>
          <ul>
            <li className={`${styles.li}`}>
              Use full sentences to ask your question
            </li>
            <li className={`${styles.li}`}>
              Use language that is seen as REC terminology
            </li>
            <li className={`${styles.li}`}>
              Access the source documentation which is provided alongside the
              answer
            </li>
            <li>Provide feedback to allow for continuous improvement</li>
          </ul>
        </div>
        <div className={`${styles.dontBox}`}>
          <div className={`${styles.dontCircle}`}>Don't</div>
          <ul>
            <li className={`${styles.li}`}>
              Ask questions which aren't related to the REC
            </li>
            <li className={`${styles.li}`}>
              Navigate away before copying the answers to the questions you have
              asked to the model
            </li>
            <li className={`${styles.li}`}>Forget to provide feedback</li>
            <li>
              Include any personal or company-specific details in your question
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export const TipsExamples1Modal = (props) => {
  const closeModal = props.closeModal;
  const tipsModalHandler = props.tipsModalHandler;
  const exampleQuestions2Handler = props.exampleQuestions2Handler;
  return (
    <Modal onClose={closeModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If you know the right terminology, try asking me questions using both
          the acronym and the exact REC term. I can then make sure I provide you
          with the most useful information as possible, like the example below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <UserQuestion messageValue="What is REL?" />
        <BotResponse
          response={mockData1}
          botSentiment={mockData1.status.answer_completness}
        />
        <UserQuestion messageValue="What is Retail Energy Location?" />
        <BotResponse
          response={mockData2}
          botSentiment={mockData2.status.answer_completness}
        />
      </div>
      <div className={`${styles.buttonContainer}`}>
        <button className={`${styles.submit}`} onClick={tipsModalHandler}>
          Back
        </button>
        <button
          className={`${styles.submit}`}
          onClick={exampleQuestions2Handler}
        >
          Next Example
        </button>
      </div>
    </Modal>
  );
};

export const TipsExamples2Modal = (props) => {
  const closeModal = props.closeModal;
  const exampleQuestions1Handler = props.exampleQuestions1Handler;
  return (
    <Modal onClose={closeModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If the answer I’ve given is not quite what you are looking for, try
          and rephrase your questions to be more specific, so I can make sure my
          answer provides you with only the information and sources you need,
          like the examples below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <UserQuestion messageValue="If I don't like a decision, can I appeal?" />

        <BotResponse
          response={mockData3}
          botSentiment={mockData3.status.answer_completness}
        />
        <UserQuestion messageValue="If I don't like a decision for a self-governance-change, can this be appealed?" />
        <BotResponse
          response={mockData4}
          botSentiment={mockData4.status.answer_completness}
        />
      </div>
      <button className={`${styles.submit}`} onClick={exampleQuestions1Handler}>
        Back
      </button>
    </Modal>
  );
};

export const DocumentsModal = (props) => {
  const documents = loadedDocuments.map((document, index) => {
    return (
      <li key={index}>
        <p className={`${styles.p} `}>
          <b>{document.documentType}</b> - {document.documentTitle}
        </p>
      </li>
    );
  });

  const documentsList = (
    <ul style={{ listStyle: "disc", margin: 0 }}>{documents}</ul>
  );

  const closeDocumentsModal = props.closeDocumentsModal;
  return (
    <Modal onClose={closeDocumentsModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>Below is a list of the documents that are included in this model</p>
      </div>
      <div className={`${styles.documentsContainer}`}>{documentsList}</div>
    </Modal>
  );
};

export const FeedbackModal = (props) => {
  const enteredFeedback = props.enteredFeedback;
  const skipFeedbackHandler = props.skipFeedbackHandler;
  const submitFeedbackHandler = props.submitFeedbackHandler;
  const feedbackChangeHandler = props.feedbackChangeHandler;
  return (
    <Modal onClose={skipFeedbackHandler}>
      <form className={`${styles.feedback}`} onSubmit={submitFeedbackHandler}>
        Please give some feedback
        <div className={`${styles.feedbackBox}`}>
          <textarea
            className={`${styles.input}`}
            name="Feedback box"
            rows="5"
            cols="70"
            wrap="soft"
            value={enteredFeedback}
            onChange={feedbackChangeHandler}
          ></textarea>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <button className={`${styles.submit}`} onClick={skipFeedbackHandler}>
            Skip
          </button>
          <button type="submit" className={`${styles.submit}`}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const ShortQueryModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h2>Sorry, your query is a bit on the short side.</h2>
      <p>
        Could you frame your request as a question with more than 10 characters
        please? That will help me provide you the best possible answer.
      </p>
      <p>
        If you want any tips on how to ask the best questions, click{"  "}
        <a className={`${styles.link}`} onClick={props.tipsModalHandler}>
          here.
        </a>
      </p>
    </Modal>
  );
};
