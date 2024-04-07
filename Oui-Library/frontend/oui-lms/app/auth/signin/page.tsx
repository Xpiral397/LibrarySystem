"use client";
import {
  Code,
  Image,
  Input,
  Select,
  Selection,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Books from "@/public/books.jpg";
import {
  Call,
  CastForEducationOutlined,
  DisabledByDefault,
  Email,
  Lock,
  Password,
  Person,
  Token,
} from "@mui/icons-material";
import { Department } from "./config";
import { Step } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Yaldevi } from "next/font/google";
import { error } from "console";

const Years = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() + i,
  toString()
);

export default function SiginCar() {
  const [faculty, setFaculty] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [matric, setMatric] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [has_graduate, setHasGraduate] = useState<boolean>();
  const [level, setLevel] = useState<string>("");
  const [expected, yearOfGraduation] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [re_password, setRePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [has, setHas] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<any>({
    Name: "",
    Matric: "",
    Tel: "",
    Email: "",
    Password: "",
    RePassword: "",
    Faculty: "",
    Gender: "",
    Department: "",
    Expected: "",
    Level: "",
  });

  useEffect(() => {
    if (has) {
      setError((prevError: any) => ({
        ...prevError,
        Name: !Name.length ? "Name is required" : "",
        Matric: !matric ? "Matric is required" : "",
        Tel: !tel ? "Mobile number is required" : "",
        Email: !email ? "Email is required" : "",
        Faculty: !faculty ? "Faculty is required" : "",
        Department: !department ? "Department is required" : "",
        Gender: !gender ? "Gender is required" : "",
        Expected: !expected ? "Expected field is required" : "",
        Level: !level ? "Level is required" : "",
        Password:
          password && password.length < 5
            ? "Password must be at least 5 characters"
            : password && password.length > 5
            ? ""
            : "Password must be at least 5 characters",
        RePassword: re_password !== password ? "Passwords do not match" : "",
      }));
    }

    setDisabled(false);
    setLoading(false);
  }, [
    Name,
    loading,
    disabled,
    matric,
    tel,
    email,
    faculty,
    department,
    gender,
    expected,
    level,
    password,
    re_password,
  ]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-between items-center space-x-[10%] mr-10 ">
        {/* <Image src={Books.src} className="lg:flex hidden w-[500px]" /> */}
        <div className="min-w-[500px] h-full rounded-lg shadow-2xl bg-zinc-50 flex flex-col px-3 py-5 ">
          <div className="flex items-center  space-x-4">
            <Image width={100} src={Logo.src} />
            <div>
              <p className="font-[800] bg-purple-100 rounded-lg py-4 px-5">
                ODUDUWA UNIVERSITY LIBRARY MANAGEMENT
                <p className="font-[400] text-sm text-zinc-900">
                  Ipetumodu P.M.B 5544, ile-ife, Osun State
                </p>
                <span className="bg-red-100 rounded-md mt-2  mb-5 px-1 py-1 text-yellow-500">
                  UNIVERSITY LIBRARY
                </span>
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <form className="w-[450px] space-y-10 mt-10">
              <div className="flex flex-col space-y-3 w-full justify-center ">
                <div>
                  <label
                    className="text-red-300 font-[700] text-[14px]"
                    htmlFor="name"
                  >
                    Matric No *
                  </label>
                  <Input
                    classNames={{
                      inputWrapper:
                        "border border-slate-300 focus:outline-none",
                    }}
                    onChange={(e) => setMatric(e.target.value)}
                    isInvalid={error.Matric != ""}
                    errorMessage={error.Matric}
                    classNames={{ inputWrapper: "font-[700]" }}
                    variant="bordered"
                    color="default"
                    startContent={<Token color="warning" />}
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="text-red-300 font-[700] text-[14px]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Input
                    classNames={{
                      inputWrapper:
                        "border border-slate-300 focus:outline-none",
                    }}
                    variant="bordered"
                    onChange={(e) => setPassword(e.target.value)}
                    errorMessage={error.Password}
                    isInvalid={error.Password != ""}
                    startContent={<Lock color="warning" />}
                    type="password"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setLoading(true);
                  setHas(true);
                  setDisabled(true);
                }}
                variant="bordered"
                disabled={disabled}
                isLoading={loading}
                className="bg-purple-700 w-full text-white font-[700]"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
