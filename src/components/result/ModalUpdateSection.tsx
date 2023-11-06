import {
    Button,
    FormLabel,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import { PlusIcon } from "../../icons";
import { InputField } from "../../ui-kit";
import { SubSection } from "./SubSection";

type Props = {
    ModalUpdateStatus: any;
    form: any;
    onSubmit: any;
};

const ModalUpdateSection = ({ ModalUpdateStatus, form, onSubmit }: Props) => {
    // const { handleSubmit, setValue, watch, reset } = form;
    // const listSubsection = watch("subsection");

    return (
        <Modal
            isCentered
            isOpen={ModalUpdateStatus.isOpen}
            onClose={() => {
                // reset();
                ModalUpdateStatus.onClose();
            }}
        >
            <ModalOverlay bg="#4144441f" />
            <ModalContent>
                <ModalHeader>{"update section"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack
                        // onSubmit={handleSubmit(onSubmit)}
                        as="form"
                        h="100%"
                        gap={2}
                    >
                        <InputField
                            form={form}
                            label="Title"
                            name="title"
                            placeholder="Enter title..."
                            type="text"
                        />
                        <FormLabel>{"Subsection"}</FormLabel>

                        {/* {listSubsection.map((_, _idx) => (
                            <SubSection key={_idx} _idx={_idx} form={form} />
                        ))} */}

                        <HStack
                            cursor="pointer"
                            onClick={() => {
                                // let temp = [...listSubsection, ""];
                                // setValue("subsection", temp);
                            }}
                        >
                            <Icon as={PlusIcon} />
                            <Text>Add subsection</Text>
                        </HStack>

                        <Button variant="secondary" type="submit">
                            {"update"}
                        </Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalUpdateSection;
