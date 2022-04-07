
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { IBatchGenerator, ILogData } from "../core/ext-types.js"

/* 
 * Repeater
 * This generator outputs a bunch of custom log messages in batches 
 */

interface IGeneratorConfig {
    content: Array<ILogData>,   /* content */
    repeat: number,             /* repeated per each batch */
    batches: number,            /* number of batches */
}

const defaultConfig: IGeneratorConfig = {
    content: [],
    repeat: 1,
    batches: null,
};

const repeaterGenerator: IBatchGenerator = {
    name: "repeater",
    defaultConfig: defaultConfig,
    createConfiguredGenerator: function (config: IGeneratorConfig) {

        const batch: ILogData[] = [];
        for (let i = 0; i < config.repeat; ++i) {
            batch.push(...config.content);
        }

        return {
            generatorTemplate: this,
            makeInstance: (() => (async function*() {
                let b = 0;
                while (config.batches === null || b < config.batches) {
                    ++b;
                    yield batch;
                }
            })()),
        }
    }

};

export default repeaterGenerator;