import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Image as ImageIcon, Upload, Link as LinkIcon, X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminGlarryFormModal({
  isOpen,
  editingGlarry,
  formValues,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
  projects,
  isProjectsLoading,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!formValues?.photo && !formValues?.photoUrl) {
      setPreviewUrl(null);
      return;
    }

    if (formValues.photo) {
      const objectUrl = URL.createObjectURL(formValues.photo);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (formValues.photoUrl) {
      setPreviewUrl(formValues.photoUrl);
    }
  }, [formValues?.photo, formValues?.photoUrl]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange("photo", e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange("photo", e.target.files[0]);
    }
  };

  const clearImage = () => {
    onChange("photo", null);
    onChange("photoUrl", "");
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  const isBusy = isCreating || isUpdating;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideHeader={true}
      title={null} // We'll render a custom header
      description={null}
      size="lg" // Make it slightly larger for better layout
      footer={null} // We'll render a custom footer
      className="p-0 overflow-hidden bg-zinc-50/50 backdrop-blur-xl border-zinc-200/50"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              {editingGlarry ? "Edit Glarry Image" : "New Glarry Image"}
            </h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              {editingGlarry ? "Update existing gallery item details" : "Add a new photo to your project gallery"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <form id="admin-glarry-form" onSubmit={onSubmit} className="space-y-6">
            
            {/* Project Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Select Project
              </label>
              <div className="relative group">
                <select
                  id="projectId"
                  value={formValues.projectId}
                  onChange={(e) => onChange("projectId", e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:bg-zinc-50 disabled:text-zinc-400"
                  disabled={isProjectsLoading || isBusy}
                  required
                >
                  <option value="" disabled>Select a project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title || project.name || `Project #${project.id}`}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400 group-hover:text-emerald-500 transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {isProjectsLoading && (
                <p className="text-xs text-zinc-400 animate-pulse flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading available projects...
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Upload Image
                </label>
                
                <div 
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-300 group cursor-pointer",
                    dragActive 
                      ? "border-emerald-500 bg-emerald-50/50 scale-[1.02]" 
                      : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div className="mb-3 rounded-full bg-zinc-100 p-3 text-zinc-400 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-600">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-sm font-medium text-zinc-900">
                    Click to upload
                  </p>
                  <p className="text-xs text-zinc-500 text-center px-4">
                    SVG, PNG, JPG or GIF (max 5MB)
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-zinc-50 px-2 text-zinc-400 font-medium">Or via URL</span>
                  </div>
                </div>

                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LinkIcon className="h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formValues.photoUrl}
                    onChange={(e) => onChange("photoUrl", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-11 rounded-xl bg-white pl-10 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Preview Area */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  Preview
                </label>
                
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm flex items-center justify-center group">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 backdrop-blur-sm"
                        title="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 rounded-full bg-zinc-50 p-4">
                        <ImageIcon className="h-8 w-8 text-zinc-300" />
                      </div>
                      <p className="text-sm font-medium text-zinc-400">No image selected</p>
                      <p className="text-xs text-zinc-300 mt-1">Upload an image to see preview</p>
                    </div>
                  )}
                </div>
                
                {previewUrl && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 border border-emerald-100">
                    <Check className="h-3.5 w-3.5" />
                    Image ready for upload
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-zinc-100 bg-white p-6">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="rounded-full px-6 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isBusy}
            form="admin-glarry-form"
            className="min-w-[140px] rounded-full bg-zinc-900 px-6 py-2.5 font-semibold text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
          >
            {isBusy ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isCreating ? "Creating..." : "Saving..."}
              </span>
            ) : (
              <span>{editingGlarry ? "Save Changes" : "Create Glarry"}</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
