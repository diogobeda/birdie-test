import express from "express";
import Boom from "boom";
import IOCContainer from "../ioc/container";

interface Request extends express.Request {
  ioc: IOCContainer;
}

interface Response extends express.Response {
  boomError: (boom: Boom) => void;
}