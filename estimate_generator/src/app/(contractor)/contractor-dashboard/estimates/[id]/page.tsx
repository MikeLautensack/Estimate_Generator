import { estimates, lineItems } from '@/db/schemas/estimates'
import { db } from '../../../../../db'
import { eq } from "drizzle-orm"
import LineItem from '../../../../../components/misc/LineItem'
import { Card } from '@/components/ui/card'
import Estimate from '@/components/pageComponents/estimates/Estimate'
import { Estimates } from '@/types/estimates'

async function getData(id: number) {
  try {
    const estimateTableData = await db.select()
                                      .from(estimates)
                                      .where(eq(estimates.id, id))
    const lineItemsTableData = await db.select()
                                       .from(lineItems)
                                       .where(eq(lineItems.estimate_id, id))
    const estimate = {
      ...estimateTableData[0],
      lineItems: lineItemsTableData
    }
    return estimate
  } catch (error) {
    console.log(error)
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(parseInt(params.id)) as Estimates
  return (
    <main
      className='bg-gradient-to-br from-primary200 to-secondary200 flex-1 p-8 min-h-screen'
    >
      <Estimate data={data}/>
    </main>
  )
}