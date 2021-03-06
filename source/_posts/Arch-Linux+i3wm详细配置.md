---
title: Arch Linux + i3wm详细配置篇
top: true
cover: false
toc: true
mathjax: false
date: 2019-12-06 01:14:50
updatedate: 2019-12-06 01:14:50
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/img.jpg
password:
summary: Arch-linux Install and i3wm config guide. 
tags:
- Arch
- linux
- i3wm
categories:
---

## Arch linux + i3

![arch+i3](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/img.jpg)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/main.png) 
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/albert.png) 
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/music.png) 

## Installation guide

### 1. Boot the live environment

The live environment can be booted from a USB flash device, an optical disc or a network with PXE. 

### 2. Connect the Internet

```bash
wifi-menu
```

Use `ping www.archlinux.org` to verify the connection.

### 3. Update the system clock

Use `tiledatectl` to ensure the system colck is accurate

```bash
timedatectl set-ntp true
```

To check the service status, use `timedatectl status`

![timedate](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/1.png) 

### 4. Partition the disks

When recognized by the live system, disks are assigned to a block device such as `/dev/sda` or `/dev/nvme0n1` . To identify these devices, use `lsblk` or `fdisk` .

```bash
fdisk -l
```

Use [fdisk](https://wiki.archlinux.org/index.php/Fdisk) or [parted](https://wiki.archlinux.org/index.php/Parted) to modify partition tables. 

for example: 

```bash
# parted /dev/sda
(parted) mklabel
New disk label type? gpt
(parted) exit
```

Use `cfdisk` to create partition.    

It should include **EFI** , **/** (root), **/home** , **/swap** .

![Disks](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/2.png) 

### 5. Format the partitions

Note the correct partitions

- EFI partition

```bash
mkfs.vfat /dev/sda2
```

- root and home partition

```bash
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4
```

- swap partition

```bash
mkswap -f /dev/sda5
swapon /dev/swap
```

### 6. Mount the file systems

Pay attention to the **order** of mounting partitions!

- mount the file system on the root partition to `/mnt`

```bash
mount /dev/sda3 /mnt
```

- create **home** folder in `/mnt` folder and mount the file system on the home partition to `/mnt/home`

```bash
mkdir /mnt/home
mount /dev/sda4 /mnt/home
```

- create **/mnt/boot/EFI** folder and mount the file system on the EFI partition to `/mnt/boot/EFI`

```bash
mkdir /mnt/boot
mkdir /mnt/boot/EFI
mount /dev/sda2 /mnt/boot/EFI
```

### 7. Select the mirrors

```bash
vim /etc/pacman.d/mirrorlist
```

Paste the China mirrors in the beginning

![mirrorlist](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/3.png) 

### 8. Install essential packages

```bash
pacstrap /mnt base linux linux-firmware
```

### 9. Generate an **fstab** file

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Check the resulting `/mnt/etc/fstab` file, and edit it in case of errors.

```bash
cat /mnt/etc/fstab
```

![fstab](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/4.png) 

### 10. Change root into the new system

```bash
arch-chroot /mnt
```

### 11. Time zone

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc.localtime
hwclock --systohc
```

### 12. Localozation(Language)

- Uncomment `en_US.UTF-8 UTF-8` and others needed locals in `/etc/locale.gen` , and generate them with:

```bash
locale-gen
```

- Create the `locale.conf` file, and set `LANG` variable accordingly:

```bash
vim /etc/locale.conf
LANG=en_US.UTF-8
```

### 13. Initramfs

```bash
mkinitcpio -P
```

### 14. Root password

```bash
passwd root
```

### 15. [Network configuration](https://wiki.archlinux.org/index.php/Network_configuration) 

- Create the **hostname** file

```bash
vim /etc/hostname
```

Enter your hostname in this file.

- Add matching entries to **hosts**

```bash
vim /etc/hosts
```

```
127.0.0.1    localhost
::1          localhost
127.0.0.1    yourhostname.localdomain    yourhostname
```

- Install some software to ensure you can connect the Internet after reboot system.

```bash
pacman -S iw wpa_supplicant dialog networkmanager
```

[Detailed configuration](#nm) 

### 16. [Microcode](https://wiki.archlinux.org/index.php/Microcode) 

My computer is `Intel` processors.

```bash
pacman -S intel-ucode
```

### 17. [Boot loader](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader) 

[**GRUB**](https://wiki.archlinux.org/index.php/GRUB) 

```bash
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot/EFI -bootloader-id=Archlinux
grub-mkconfig -o /boot/grub/grub.cfg
```

If you can see some `img` file generated, it means the grub boot loader file are successful creatted.

### 18. Reboot

```bash
exit
umount -R /mnt
reboot
```
Use `uname -a` to view the Version of Arch linux.

![Arch_linux Version](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/5.png) 


## My config recommendations

### 1. Add users

```bash
useradd -s -G wheel -s /bin/bash username
```
To allow user to gain full root privileges when he precdeds a command with `sudo` , add the following line to `/etc/sudoers` .

```bash
USER_NAME ALL=(ALL) ALL
```

`su username` to switch users.

### 2. <a id = "nm">[NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) </a>

NetworkManager(package `networkmanager` ) contains a daemon, a command line interface( `nmcli` ) and a curses-based interface( `nmtui` ). After installation, you should **enable the daemon**.

```bash
systemctl enable NetworkManager.service
systemctl start NetworkManager.service
```

Use `ip link` to view the network interface.

![Network interface](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/6.png) 

**Usage**

- List nearby wifi networks

```bash
nmcli device wifi list
```

- Connect to a wifi network

```bash
nmcli device wifi connect SSID password password
```

- Disconnect an interface

```bash
nmcli device disconnect ifname eth0
```

- See a list of network devices and wheir state

```bash
nmcli device
```

- Turn off wifi

```bash
nmcli radio wifi off
```

`nm-applet` for a system tray applet

```bash
sudo pacman -S network-manager-applet
```

- Add `exec --no-startup-id nm-applet` to `~/.config/i3/config` fot autostart `nm-applet` .

### 3. [Xorg](https://wiki.archlinux.org/index.php/Xorg) display server

- Installation

```bash
sudo pacman -S xorg xorg-server xorg-apps
```

- Driver installation

  1. First, identify your card:

  ```bash
  lspci | grep -e VGA -e 3D
  ```

  ![card](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/7.png) 

  ![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/8.png) 

  2. Install an appropriate deiver

  ```bash
  pacman -Ss xf86-video
  ```

  **Note** : For NVIDIA Optimus enabled laptop which uses an integrated video card combined with a dedicated GPU, You  **can not** just install `xf86-video-intel` & `nvidia` , it will get a blcak screen. See [NVIDIA Optimus](https://wiki.archlinux.org/index.php/NVIDIA_Optimus) to get more informations. 

  I just install `xf86-video-vesa` . 

  ```bash
  pacman -S xf86-video-vesa
  ```

  [Xorg: Driver_installtion](https://wiki.archlinux.org/index.php/Xorg#Driver_installation) 

- Use [xinit](https://wiki.archlinux.org/index.php/Xinit) to start Xorg display server.

```bash
sudo pacman -S xorg-xinit
```

- Create `.xinitrc` file(in common users)

```bash
sudo cp /etc/X11/xinit/xinitrc ~/.xinitrc
```

- Tap-to-click

```bash
sudo vim /etc/X11/xorg.conf.d/30-touchpad.conf
```

Add the following lines to it.

```
Section "InputClass"
  Identifier "touchpad"
  Driver "libinput"
  MatchIsTouchpad "on"
  Option "Tapping" "on"
EndSection
```

- Install Windows Manager (i3)


```bash
sudo pacman -S i3
```

It include `i3-gaps` , `i3wm` , `i3blocks` , `i3lock` , `i3status`

- Use i3

Add `exec i3` to the end of `~.xinitrc` .

- Start Xorg server.

```bash
startx
```
- Autostart X at login

I'm a [fish](https://fishshell.com/) user, so i just need add the following to the bottom of my `~/.config/fish/config.fish` .

```bash
# Start X at login
if status is-login
    if test -z "$DISPLAY" -a $XDG_VTNR = 1
        exec startx -- -keeptty
    end
end
```

Other shell user (like **bash** , **zsh** ), Please visit [here](https://wiki.archlinux.org/index.php/Xinit#Autostart_X_at_login) 

### 4. i3wm

[i3wm](https://i3wm.org)  ,   [i3-ArchWiki](https://wiki.archlinux.org/index.php/I3) 

[My i3 config](https://github.com/liuyaanng/Arch_linux#i3-and-i3status) 

### 5. Some useful software

- yaourt

Add the source to `/etc/pacman.conf`

```
[archlinuxcn]
#The Chinese Arch Linux communities packages.
SigLevel = Optional TrustAll
Server = http://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
#Server   = http://repo.archlinuxcn.org/$arch
#Server   = http://repo.archlinux.fr/$arch
```

Synchronized communities

```bash
sudo pacman -Syu
```

Insatll yaourt 

```bash
sudo pacman -S yaourt
```

- [Software i often use](https://godliuyang.wang/2019/08/24/manjaro-i3wm-huan-jing-pei-zhi-pian/#toc-heading-13)

### 6. Fonts

[Fonts-ArchWiki](https://wiki.archlinux.org/index.php/Fonts) , [Nerd-fonts](https://github.com/ryanoasis/nerd-fonts) , [Unicode-table]( https://unicode-table.com/en/ )  


| adobe-source-code-pro | adobe-source-han-serif-cn-fonts | adobe-source-han-serif-tw-fonts |
|:---------------------:|:-------------------------------:|:-------------------------------:|
|      ttf-symbola      |       nerd-fonts-complete       |    nerd-fonts-dejavu-complete   |
|      font-awesome     |         noto-fonts-emoji        |                                 |

`fc-list` to show the fonts you have installed.

### 7. Volume

- ALSA is a set of built-in GNU/Linux modules. Therefore, manual insatllation is not necessary.

- Install **pulseaudio**

```bash
sudo pacman -S pulseaudio
```

- Install **alsa-utils**

```bash
sudo pacman -S alsa-utils
```

Use `alsamixer` to manage the system volume

- VoulmeIcon

![VolumeIcon](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/9.png) 

If you want a System volume tray, you can try **volumeicon**

  1. Install volumeicon

  ```bash
  sudo pacman -S volumeicon
  ```

  2. Add `volumeicon` file in `~/.config/volumeicon`  , and add the following lines to it.

  ```bash
  [Alsa]
  card=default

  [Notification]
  show_notification=true
  notification_type=1

  [StatusIcon]
  stepsize=5
  onclick=xterm -e 'alsamixer'
  theme=White Gnome
  use_panel_specific_icons=true
  lmb_slider=true
  mmb_mute=true
  use_horizontal_slider=false
  show_sound_level=true
  use_transparent_bac<++>kground=true

  [Hotkeys]
  up_enabled=true
  down_enabled=true
  mute_enabled=true
  up=XF86AudioRaiseVolume
  down=XF86AudioLowerVolume
  mute=XF86AudioMute
  ```

  3. Create `pulseaudio-ctl.desktop` in `~/.config/autostart` , and add the following lines to it.

  ```bash
  [Desktop Entry]
  Encoding=UTF-8
  Type=Application
  Name=pulseaudio-ctl
  comment=Set Volume to 70%
  Exec=pulseaudio-ctl-normal
  StartupNotify=true
  Terminal=false
  Hidden=false
  ```

  4. Add `exec --no-startup-id volumeicon` to `~/.config/i3/config` .

  5. I wrote two scripts to control the volume of the system with `alsamixer` and `dunst` , put them to `/usr/bin/` .

  [volume_up](https://github.com/liuyaanng/Arch_linux/blob/master/volume_up.sh)    
  [volume_down](https://github.com/liuyaanng/Arch_linux/blob/master/volume_down.sh) 

### 8. Screen brightness

A good advice for backlight management is `xorg-xbacklight` , but it seems not work on my computer. 

![xbacklight -error](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/12.png) 

If you have the same problem, you can try the solution of Wiki, but it still can't work on my computer. Sad! So i try another way to control the screen brightness.    
The backlight can be controlled by the file `/sys/class/backlight/intel_backlight/brightness` 's value. So i wrote a script to control it. I named it `intel_brightness_control.sh`

```bash
#!/bin/bash
set -e
file="/sys/class/backlight/intel_backlight/brightness"
current=$(cat "$file")
new="$current"
if [ "$1" = "-inc" ]
then
  new=$(( current + $2 ))
  status="Up"
fi
if [ "$1" = "-dec" ]
then
  if [ current < 100 ]
  then
    new="50"
  else
    new=$(( current - $2 ))
  fi
  status="Down"
fi
echo "$new" | tee "$file"
brightness=`light -G`
notify-send "Brightness $status($brightness%)"
```

Remember put it in your `/usr/bin/`.

Then do `sudo chmod 777 /sys/class/backlight/intel_backlight/brightness` . The last thing is adding the following lines to `.config/i3/config` .

```bash
# Screen brightness controls
bindsym XF86MonBrightnessUp exec "intel_brightness_control.sh -inc 100"
bindsym XF86MonBrightnessDown exec "intel_brightness_control.sh -dec 100"
```

### 9. Bluetooth

- Install **bluez** , **bluez-utils**

```bash
sudo pacman -S bluez bluez-utils
```

- The generic Bluetooth driver is the `btusb` Kernel module. Use `lsmod` to check whether that module is loaded. 

![btusb module](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/11.png)    
  If it's not, do `modprobe btusb` to load the moudle.

- Start / Enable

```bash
systemctl enable bluetooth.service
systemctl start bluetooth.service
```

- Auto power-on after boot

Add the line `AutoEnable=true` in `/etc/bluetooth/main.conf` at the bottom in the `[Policy]` section.

- Discoverable on startup

```bash
/etc/bluetooth/main.conf

[General]
DiscoverableTimeout = 0
Discoverable=true
```

- Install **pulseaudio-bluetooth** to use audio equipment like bluetooth headphones or speakers.

[Bluetooth headset](https://wiki.archlinux.org/index.php/Bluetooth_headset) 

```bash
sudo pacman -S pulseaudio-bluetooth
```

- Install [blueman](https://github.com/blueman-project/blueman) 

```bash
sudo pacman -S blueman
```
  1. `blueman-applet` to use.
  2. add `exec --no-startup-id blueman-applet` to `~/.config/i3/config` to auto start `blueman-applet` .

### 10. Notify(Dunst)

```bash
sudo pacman -S libnotify dunst
```

Create `org.freedesktop.Notifications.service` in `/usr/share/dbus-1/services/` folder. Add the following lines.

```
[D-BUS Service]
Name.org.freedesktop.Notifications
Exec=/usr/local/bin/dunst
```

An example configuration file is included at `/usr/local/share/dunst/dunstrc` . Copy this file to `~/.config/dunst/dunstrc` and edit it accordingly.

[My Dunstrc](https://github.com/liuyaanng/Arch_linux/tree/master/dunst) 

Use `notify-send "Hello, world!" ` to test.

![Dunst](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Arch-Linux/10.png) 

### 11. Shutdown Reboot LockScreen

- Create a script named `i3exit` . Make sure you have `polkit` installed. 

```bash
#!/bin/sh
lock() {
    i3lock
}

case "$1" in
    lock)
        blurlock
        ;;
    logout)
        i3-msg exit
        ;;
    suspend)
        blurlock && systemctl suspend
        ;;
    hibernate)
        blurlock && systemctl hibernate
        ;;
    reboot)
        systemctl reboot
        ;;
    shutdown)
        systemctl poweroff
        ;;
    *)
        echo "Usage: $0 {lock|logout|suspend|hibernate|reboot|shutdown}"
        exit 2
esac

exit 0
```

Do `chmod +x` and put it in `$PATH` ( `/usr/bin/` ) .

- Add the following lines to `.config/i3/config`

```bash
set $mode_system System (l) lock, (e) logout, (s) suspend, (h) hibernate, (r) reboot, (Shift+s) shutdown
mode "$mode_system" {
    bindsym l exec --no-startup-id i3exit lock, mode "default"
    bindsym e exec --no-startup-id i3exit logout, mode "default"
    bindsym s exec --no-startup-id i3exit suspend, mode "default"
    bindsym h exec --no-startup-id i3exit hibernate, mode "default"
    bindsym r exec --no-startup-id i3exit reboot, mode "default"
    bindsym Shift+s exec --no-startup-id i3exit shutdown, mode "default"  

    # back to normal: Enter or Escape
    bindsym Return mode "default"
    bindsym Escape mode "default"
}
bindsym $mod+Pause mode "$mode_system"
```

















