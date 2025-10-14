<<<<<<< HEAD
const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-[28px] font-bold text-[#1F2937]">{title}</h1>
  );
};

export default PageTitle; 
=======
import SplitText from "../../components/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};



const PageTitle = ({ title }: { title: string }) => {
  return (
    <SplitText
        text={title}
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
    />
  );
};

export default PageTitle
>>>>>>> c802c73 (feat(Title): Done title and dropdown component)
