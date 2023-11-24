import ChangeOrdersTable from "@/components/tables/customerTables/changeOrdersTable/ChangeOrdersTable";
import { columns } from "@/components/tables/customerTables/changeOrdersTable/columns";
import { db } from '../../../db'
import { ChangeOrders } from "@/types/changeOrders";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function getData(session: any) {
  const res = await db.select()
                      .from(changeOrders)
                      .where(eq(changeOrders.customer_user_id, session.user.id))
  return res
}

export default async function ChangeOrders() {

  const session = getServerSession(authOptions)
  const data = await getData(session) as ChangeOrders[]

  return (
    <div>
      <h1>ChangeOrders</h1>
      <div>
        <ChangeOrdersTable columns={columns} data={data} />
      </div>
    </div>
  )
}