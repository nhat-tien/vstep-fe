import ContainerListen from "@/components/Exams/ContainerSkill/Listening/ContainerListen";
import ContainerReading from "@/components/Exams/ContainerSkill/Reading/ContainerReading";
import ContainerSpeaking from "@/components/SpeakingContainTest";
import ContainerWriting from "@/components/Exams/ContainerSkill/Writing/ContainerWriting";

const PartPage = ({ params: {skill } }) => {

  const renderContainerSkill = () => {
    switch (skill) {
      case "listening":
        return (
          <ContainerListen />
        );
      case "reading":
        return (
          <ContainerReading />
        );
      case "writing":
        return (
          <ContainerWriting />
        );
      case "speaking":
        return (
          <ContainerSpeaking />
        );
      default:
        return <div>Skill not supported</div>;
    }
  };

  return (
    <div>
      {renderContainerSkill()}
    </div>
  );
};

export default PartPage;
