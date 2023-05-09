import {FormField, FormFieldProperties} from "./FormField";
import React from "react";
import {ImagePicker, ImagePickerProperties} from "./ImagePicker";
import {ButtonType} from "../../enums/ButtonTypes";
import {Button, ButtonProperties} from "../basics/Button";

interface FormProperties {
    fields: Array<FormFieldProperties>
    error: string | undefined
    submitButton: ButtonProperties
    alternateButton?: ButtonProperties
    imagePicker?: ImagePickerProperties
}

export function Form({
                         fields,
                         error,
                         submitButton,
                         alternateButton,
                         imagePicker
                     }: FormProperties) {
    return (
        <form className="form">
            {imagePicker && (
                <ImagePicker defaultPicture={imagePicker.defaultPicture} fileSelector={imagePicker.fileSelector}
                             oldPicture={imagePicker.oldPicture} selectedPicture={imagePicker.selectedPicture}
                             submitAction={imagePicker.submitAction}/>
            )}
            <div className="form-fields">
                {fields.map((field, index) => (
                    <FormField
                        key={index}
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        editable={field.editable}
                        editableAction={field.editableAction}
                        required={field.required}
                    />
                ))}
            </div>
            <div className="form-error">
                {error && error.length > 0 && <p>{error}</p>}
            </div>
            <div className="form-validate">
                {alternateButton && (<Button type={ButtonType.ALTERNATE} label={alternateButton.label} action={alternateButton.action}/>)}
                <Button type={ButtonType.SUBMIT} label={submitButton.label} action={submitButton.action} />
            </div>
        </form>
    );
}
