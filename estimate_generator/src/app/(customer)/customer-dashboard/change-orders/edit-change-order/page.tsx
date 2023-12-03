import ChangeOrderForm from "@/components/forms/ChangeOrderForm";
import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm"

async function getEstimate(id: number) {
  try {
    const estimate = await db.select()
                             .from(estimates)
                             .where(eq(estimates.id, id))
    return estimate
  } catch (error) {
    console.log(error)
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  
  const changeOrderId = searchParams.changeOrderId
  const estimateId = searchParams.estimateId
  const estimateResponse = await getEstimate(parseInt(estimateId as string))

  let estimate
  if (estimateResponse && estimateResponse.length > 0) {
    estimate = estimateResponse[0]
  } 

  const data = {
    estimateName: estimate?.estimateName,
    projectAddress: estimate?.projectAddress,
    contractor_user_id: estimate?.contractor_user_id,
    customer_user_id: estimate?.customer_user_id,
    change_order_id: parseInt(changeOrderId as string),
    mode: 'put'
  }

  return (
    <main>
      <ChangeOrderForm data={data} />
    </main>
  )
}