import { Description, Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "keep-react";
import SecureAxios from "../Hook/SecureAxios";

function AdminProfile() {
  const [tag, setTag] = useState("");

  const handelTagPost = async () => {
    if (tag === "" || undefined || null)
      return toast.warning("please provide a tag");

    await SecureAxios.post(`/tag`, { tag: tag })
      .then(() => {
        console.log(tag);
        setTag("");
        toast.success("Tags saved successfully");
      })
      .catch(() => {
        toast.error("Error saving tags");
        console.log("error saving tags");
      });
  };
  return (
    <div>
      {/* post tags */}
      <div className="w-full max-w-md px-4 ">
        <Field>
          <Label className="text-sm/6 font-medium ">Name</Label>
          <Description className="text-sm/6 ">
            Use your real name so people will recognize you.
          </Description>
          <Input
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            placeholder="type tags"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 ",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <Button
            onClick={handelTagPost}
            className="inline-flex my-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Save changes
          </Button>
        </Field>
      </div>
    </div>
  );
}

export default AdminProfile;
