// Copyright 2017-2020 The ShadowEditor Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
//
// For more information, please visit: https://github.com/tengge1/ShadowEditor
// You can also visit: https://gitee.com/tengge1/ShadowEditor

package server

import (
	"testing"
)

func TestMux(t *testing.T) {

}

func TestStart(t *testing.T) {
	Create("../config.toml")
	// port := Config.Server.Port
	go Start()
}

func TestHandle(t *testing.T) {

}

func TestCORSHandler(t *testing.T) {

}
