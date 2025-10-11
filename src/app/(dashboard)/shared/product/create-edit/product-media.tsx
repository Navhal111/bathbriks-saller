import { useFormContext } from 'react-hook-form';
import UploadZone from '@/components/ui/upload-zone';
import FormGroup from '@/app/(dashboard)/shared/form-group';
import cn from '@/utils/class-names';

interface ProductMediaProps {
  className?: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  isUpdatingMedia?: boolean
}

export default function ProductMedia({ className, files, setFiles, isUpdatingMedia }: ProductMediaProps) {

  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();


  return (
    <FormGroup
      title="Upload new product images"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      <UploadZone
        className="col-span-full"
        name="productUrl"
        getValues={getValues}
        setValue={setValue}
        error={errors.productUrl?.message as string}
        files={files}
        setFiles={setFiles}
        isUpdatingMedia={isUpdatingMedia}
      />
    </FormGroup>
  );
}
