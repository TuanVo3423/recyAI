import { HStack, Icon } from "@chakra-ui/react";
import { TrashIcon } from "../../icons";
import { InputFieldWithoutLabel } from "../../ui-kit";

export const SubSection = ({ form, _idx }: any) => {
    const { setValue, watch } = form;
    const listSubsection = watch("subsection");
    // delete value form
    const handleDelete = () => {
        let temp = [...listSubsection];
        temp.splice(_idx, 1);
        setValue("subsection", temp);
    };
    return (
        <HStack>
            <InputFieldWithoutLabel
                form={form}
                _idx={_idx}
                nameOfArr="subsection"
                name={`subsection.${_idx}`}
                placeholder="Enter subsection..."
                type="text"
            />
            <Icon onClick={handleDelete} as={TrashIcon} />
        </HStack>
    );
};
