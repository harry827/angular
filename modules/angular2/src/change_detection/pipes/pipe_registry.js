import {List, ListWrapper} from 'angular2/src/facade/collection';
import {isBlank, isPresent, BaseException, CONST} from 'angular2/src/facade/lang';
import {Pipe} from './pipe';
import {ChangeDetectorRef} from '../change_detector_ref';

export class PipeRegistry {
  config;

  constructor(config){
    this.config = config;
  }

  get(type:string, obj, cdRef:ChangeDetectorRef):Pipe {
    var listOfConfigs = this.config[type];
    if (isBlank(listOfConfigs)) {
      throw new BaseException(`Cannot find a pipe for type '${type}' object '${obj}'`);
    }

    var matchingConfig = ListWrapper.find(listOfConfigs,
      (pipeConfig) => pipeConfig.supports(obj));

    if (isBlank(matchingConfig)) {
      throw new BaseException(`Cannot find a pipe for type '${type}' object '${obj}'`);
    }

    return matchingConfig.create(cdRef);
  }
}