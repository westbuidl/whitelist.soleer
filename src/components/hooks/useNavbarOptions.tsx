import { useRouter } from "next/navigation";



const useNavbarOptions = ()=>{
    const router = useRouter();
    return   [
        {
          title: "ABOUT",
          link: "/#about",
        },
        {
          title: "HOW IT WORKS",
          link: "/#how",
        },
        {
          title: "BENEFITS",
          link: "/#benefits",
        },
        {
          title: "ROADMAP",
          link: "/#roadmap",
        },
        
        {
          title: "MARKETPLACE",
          link: "marketplace",
        },
      ];
}

export default useNavbarOptions;