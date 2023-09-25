/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

function handler() {
    let proc = Gio.Subprocess.new(
        ['xdg-open', 'https://go.microsoft.com/fwlink/?linkid=2044786'],
        Gio.SubprocessFlags.NONE
    );
    proc.wait_check_async(null, (source, res) => {
        try {
            if (!source.wait_check_finish(res))
                logError('Open Linkedln failed.');
        } catch (e) {
            logError(e);
        }
    });
}

export default class PlainExampleExtension extends Extension {
    enable() {
        let settings = this.getSettings('org.gnome.shell.extensions.open-linkedln');
        Main.wm.addKeybinding('open-linkedln-shortcut', settings, Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            handler);
    }

    disable() {
        Main.wm.removeKeybinding('open-linkedln');
    }
}
