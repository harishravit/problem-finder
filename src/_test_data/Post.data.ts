import maleUserImage from "@/assets/Avatar_test.png";
import femaleUserImg from "@/assets/premium_vector-1682269284255-8209b981c625.avif";
export type PostData = {
  userProfile: React.ReactNode;
  userName: string;
  userRole: string;
  content: string;
  children?: PostData[];
};
export const postData: PostData[] = [
  {
    userProfile: maleUserImage,
    content:
      "lorem eps fks asfsfsai sknfsa fsaknfs fasfnsaf askffsanfsa fshfsiajfsa,cnoas askaskc skfnsakfs auasf;asfsfuasf sa",
    userName: "Harish R",
    userRole: "Software engineer",
    children: [
      {
        userProfile: femaleUserImg,
        content:
          "lorem eps fks asfsfsai sknfsa fsaknfs fasfnsaf askffsanfsa fshfsiajfsa,cnoas askaskc skfnsakfs auasf;asfsfuasf sa",
        userName: "melona",
        userRole: "Entrepernur",
        children: [
          {
            userProfile: femaleUserImg,
            content:
              "lorem eps fks asfsfsai sknfsa fsaknfs fasfnsaf askffsanfsa fshfsiajfsa,cnoas askaskc skfnsakfs auasf;asfsfuasf sa",
            userName: "melona",
            userRole: "Entrepernur",
          },
        ],
      },
      {
        userProfile: femaleUserImg,
        content:
          "lorem eps fks asfsfsai sknfsa fsaknfs fasfnsaf askffsanfsa fshfsiajfsa,cnoas askaskc skfnsakfs auasf;asfsfuasf sa",
        userName: "melona",
        userRole: "Entrepernur",
      },
    ],
  },
];
