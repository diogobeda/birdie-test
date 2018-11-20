import express from "express";
import IOCContainer from "../ioc/container";

interface Request extends express.Request {
  ioc: IOCContainer
}