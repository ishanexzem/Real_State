import { SettingsFormData, settingsSchema } from '@/lib/schemas';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from './ui/form';
import { CustomFormField } from './FormField';
import { Button } from './ui/button';



const SettingsForm = ({
    initialData,
    onSubmit,
    userType
} : SettingsFormProps
) => {
const [editMode, setEditMode] = useState(false);
const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData
});

const toggleEditMode= () => {
    setEditMode(!editMode);
    if(editMode){
        form.reset(initialData);
    }
}
 
const handleSubmit =async (data: SettingsFormData) =>{
    await onSubmit(data);
   setEditMode(false);
}

  return (
    <div className="pt-8 pb-5 px-8">
        <div className="mb-5 max-w-xl mx-auto space-y-5 ">
            <h1 className="text-xl font-semibold ">
                {`${userType.charAt(0).toUpperCase() + userType.slice(1)} Settings`}
                  
            </h1>
            <p className="text-sm text-gray-500 mt-1 ">
                Manage your account preferences and personal information.
            </p>
        </div>


       <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-6">
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6"
    >
      <CustomFormField
        name="name"
        label="Name"
        disabled={editMode}
      />
      <CustomFormField
        name="email"
        label="Email"
        type="email"
        disabled={editMode}
      />
      <CustomFormField
        name="phoneNumber"
        label="Phone Number"
        disabled={editMode}
      />

      <div className="pt-6 flex justify-end space-x-4">
        <Button
          type="button"
          onClick={toggleEditMode}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
        {editMode && (
          <Button
            type="submit"
            className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-red-800 transition-colors"
          >
            Save Changes
          </Button>
        )}
      </div>
    </form>
  </Form>
</div>




    </div>
  )
}

export default SettingsForm
