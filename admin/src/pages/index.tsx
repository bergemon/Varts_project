import { PageLayout } from "@/layout/pageLayout";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { isAuth } from "@/utils/isAuth";
import { NextPageContext } from "next";
import { ReactElement } from "react";

export default function Home() {
  const user = useAppSelector(state => state.auth)
  console.log(user)
  return (
    <main>
      
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAuthencate = await isAuth(ctx)

  if (!isAuthencate) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
};