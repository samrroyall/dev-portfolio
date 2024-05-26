import { getPrettyDateTime } from "../../../utils";
import { IconButton, NoData } from "../../shared";

const headerRowClasses = `
  [&>th]:border [&>th]:dark:border-secondary-bg-dark [&>th]:border-secondary-bg 
  [&>th]:p-3
`;

const bodyRowClasses = `
  [&>td]:border [&>td]:dark:border-secondary-bg-dark [&>td]:border-secondary-bg 
  [&>td]:p-3
`;

const headerClasses = `
  text-secondary-text dark:text-secondary-text-dark font-semibold
  bg-tertiary-bg dark:bg-tertiary-bg-dark
`;

const columnLabels = ["Title", "Created", "Last Updated", "Actions"];

interface AdminTableProps {
  createHref: string;
  deleteHref: (id: string) => string;
  editHref: (id: string) => string;
  rows: {
    id: string;
    title: string;
    createdAt: number;
    lastModifiedAt: number;
  }[];
}

const AdminTable = ({
  createHref,
  deleteHref,
  editHref,
  rows,
}: AdminTableProps) => (
  <div class="my-6 w-full text-center">
    <table class="w-full table-auto">
      <thead class={headerClasses}>
        <tr class={headerRowClasses}>
          {columnLabels.map((label) => (
            <th>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ id, title, createdAt, lastModifiedAt }) => (
          <tr class={bodyRowClasses}>
            <td>{title}</td>
            <td>{getPrettyDateTime(createdAt)}</td>
            <td>{getPrettyDateTime(lastModifiedAt)}</td>
            <td>
              <IconButton
                label="Edit"
                icon={"\udb80\udfeb"}
                href={editHref(id)}
              />
              <span class="ml-2">
                <IconButton
                  label="Delete"
                  icon={"\udb80\uddb4"}
                  href={deleteHref(id)}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {rows.length === 0 ? (
      <div class="border-secondary-bg dark:border-secondary-bg-dark border-x border-b py-5">
        <NoData />
      </div>
    ) : null}
    <div class="border-secondary-bg dark:border-secondary-bg-dark border-x border-b  p-3">
      <IconButton label="Add new entry" icon={"\uf44d"} href={createHref} />
    </div>
  </div>
);

export default AdminTable;
