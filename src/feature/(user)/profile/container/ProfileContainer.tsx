"use client";
import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { PencilLine, Save, X } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";

const ProfileContainer: React.FC = () => {
  const {
    user,
    isEditing,
    loading,
    formData,
    handleEditToggle,
    handleFormChange,
    handleSubmit,
    handleCancel,
  } = useProfile();

  return (
    <main className="bg-login min-h-screen py-14">
      <section className="mycontainer px-4 md:px-0">
        <div className="flex flex-row justify-between items-center md:items-center">
          <h4 className="text-black text-4xl md:text-4xl font-semibold">
            Profil
          </h4>

          {isEditing ? (
            <div className="flex gap-2 items-center h-full">
              <Button
                variant="outline"
                className="h-12 w-12 md:h-12 px-4 md:w-auto"
                size="icon"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline-flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </span>
              </Button>

              <Button
                variant="primary"
                size="icon"
                className="h-12 w-12 md:h-12 px-4 md:w-auto"
                onClick={handleSubmit}
                disabled={loading}
              >
                <Save
                  className={`h-4 w-4 md:hidden ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden md:inline-flex items-center gap-2">
                  <Save
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Simpan Perubahan
                </span>
              </Button>
            </div>
          ) : (
            <Button variant="primary" size="default" onClick={handleEditToggle}>
              <PencilLine className="h-4 w-4" />
              <span className="ml-2">Edit Profil</span>
            </Button>
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <ProfileForm
            user={user}
            isEditing={isEditing}
            formData={formData}
            onFormChange={handleFormChange}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfileContainer;
