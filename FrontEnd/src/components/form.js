import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import get_icon, { Icons } from './icons_SVG';

export default function Form(props) {
    const required = props.required ?? false;
    const formType = props.formType ?? "input"

    return (
        <div className="flex flex-col">
            <span className="flex flex-row justify-start items-center space-x-1 tracking-wide text-gray-500 text-14px font-avenir-med mb-2px">
                {props.isLabelBlue?
                <label className='text-blue-400'>
                    {props.label}
                </label> 
                : 
                <label>
                    {props.label}
                </label>}
                { required ? <label className="h-full text-red-500 inline-block ">*</label> : null }
            </span>
            {formType === "input" ? 
            <InputField  disabled={props.disabled} label={props.label} placeholder={props.placeholder} width={props.width} height={props.height} minLength={props.minLength} maxLength={props.maxLength} value={props.value} type={props.type} onChange={props.onChange}/> 
            : null}

            {formType === "selection" ? 
            <SelectionField width={props.width} height={props.height} options={props.options} selected={props.selected} onChange={props.onChange}/>
            : null}
        </div>
    )
}


export function InputField(props) {
    const width = props.width ?? 300;
    const height = props.height ?? 40;
    const minLength = props.minLength ?? 0;
    const maxLength = props.maxLength ?? Infinity;
    const value = props.value;
    const type = props.type ?? "text";
    const onChange = props.onChange ?? ((_) => {})
    const disabled = props.disabled ?? false

    return (
        <div className={`w-${width}px h-${height}px flex flex-row justify-start items-center`}>
            {
                height > 40 ? 
              <textarea id={props.label} className={ `${disabled ? "cursor-not-allowed" : "" } h-full w-full px-12px py-12px bg-gray-100 rounded-12px text-14px text-gray-500 placeholder-shown:text-12px placeholder-gray-300 align-middle focus:outline-none resize-none cursor-not-allowed`}
                    type={type} 
                    placeholder={props.placeholder} 
                    value={value} 
                    onChange={onChange} 
                    maxLength={maxLength} 
                    minLength={minLength}
                    disabled={disabled}/>
                : 
                <input id={props.label}className={ `${disabled ? "cursor-not-allowed" : "" } h-full w-full px-12px py-12px bg-gray-100 rounded-12px text-14px text-gray-500 placeholder-shown:text-12px placeholder-gray-300 align-middle focus:outline-none resize-none`}
                    type={type} 
                    placeholder={props.placeholder} 
                    value={value} 
                    onChange={onChange} 
                    maxLength={maxLength} 
                    minLength={minLength}
                    disabled={disabled}/>
            }
        </div>
    );
}


export function SelectionField(props) {

    const width = props.width ?? 300;
    const height = props.height ?? 40;
  const options = props.options ?? ["please select"]
  const selected = props.selected
  const onChange = props.onChange ?? ((_) => {})

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className={`flex flex-row justify-between items-center relative w-${width}px h-${height}px bg-gray-100 rounded-12px cursor-default focus:outline-none`}>
                <div className='w-12px ml-12px'/>
                <div className='text-14px text-gray-600'>{selected}</div>
                <div className='w-12px mr-12px'>{get_icon(Icons.dropdown)}</div>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={`absolute z-10 mt-1 w-full bg-white rounded-12px ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none`}>
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={`cursor-default select-none focus:outline-none relative py-2 hover:bg-blue-50`}
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center justify-center">
                          <span
                            className={`block truncate text-14px ${selected ? "text-blue-500" : "text-gray-500"}`}
                          >
                            {option}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}



/*
                            <FillQuestion name={"Location"} type={"text"} />
                            <FillQuestion name={"Price Tag"} type={"text"} />
                            <FillQuestion name={"Category Tag"} type={"text"} />
*/
/*
<input id={props.label} 
                className="placeholder:tracking-normal placeholder:font-avenir-reg placeholder:text-12px focus:outline-none px-12px placeholder-gray-300 h-40px bg-gray-100 rounded-12px text-gray-500 align-middle" 
                type={props.type} 
                placeholder={props.placeholder} 
                value={props.value} 
                onChange={props.onChange} 
                required maxLength={props.maxLength ?? Infinity} minLength={props.minLength ?? 0}/>
*/