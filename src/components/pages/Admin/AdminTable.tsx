import { randomBytes } from "crypto";
import { getPrettyDateTime } from "../../../utils";
import { IconButton, Modal, NoData } from "../../shared";

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
  deleteHref: (id: number) => string;
  editHref: (id: number) => string;
  rows: {
    id: number;
    title: string;
    createdAt: Date;
    lastModifiedAt: Date;
  }[];
}

const AdminTable = ({
  createHref,
  deleteHref,
  editHref,
  rows,
}: AdminTableProps): JSX.Element => {
  const tableId = randomBytes(8).toString("hex");

  return (
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
              <td class="flex flex-wrap justify-center *:m-1">
                <IconButton
                  label="Edit"
                  icon={"\udb80\udfeb"}
                  href={editHref(id)}
                />
                <Modal
                  id={`delete-${tableId}-${id}-modal`}
                  className="flex flex-col items-center justify-center"
                >
                  <p class="mb-3">{"Are you sure you want to delete this?"}</p>
                  <IconButton
                    id={`modal-delete-button-${tableId}-${id}`}
                    label="Delete"
                    icon={"\udb80\uddb4"}
                    hx-delete={deleteHref(id)}
                    hx-swap="none"
                    hx-trigger="click"
                    hx-on-click={`htmx.toggleClass("#delete-${tableId}-${id}-modal", "hidden");`}
                  />
                </Modal>
                <IconButton
                  label="Delete"
                  icon={"\udb80\uddb4"}
                  hx-on-click={`htmx.toggleClass("#delete-${tableId}-${id}-modal", "hidden");`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? (
        <div class="border-secondary-bg dark:border-secondary-bg-dark border-x border-b px-3 py-5">
          <NoData />
        </div>
      ) : null}
      <div class="border-secondary-bg dark:border-secondary-bg-dark border-x border-b  p-3">
        <IconButton label="Add new entry" icon={"\uf44d"} href={createHref} />
      </div>
    </div>
  );
};

export default AdminTable;
