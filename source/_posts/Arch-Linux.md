---
title: Arch Linux
top: false
cover: false
toc: true
mathjax: false
date: 2019-12-06 01:14:50
img: https://i.loli.net/2019/12/07/ykIzuo8Z1PSGpLv.png
password:
summary:
tags:
categories:
---


## Arch linux + i3

![arch+i3](https://i.loli.net/2019/12/07/ykIzuo8Z1PSGpLv.png)

    
TODO    
- [ ] Arch Installation    
- [ ] Arch configuration    
- [ ] i3wm configuration    


## Installation guide

### 1. Boot the live environment

The live environment can be booted from a USB flash deive, an optical disc or a network with PXE. 

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

![timedate](1.png) 

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

![Disks](2.png) 

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

![mirrorlist](3.png) 

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

![fstab](4.png) 

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

### 13. Network configuration

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

### 14. Initramfs

```bash
mkinitcpio -P
```

### 15. Root password

```bash
passwd root
```

### 16. [Boot loader](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader) 

[**GRUB**](https://wiki.archlinux.org/index.php/GRUB) 

```bash
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot/EFI -bootloader-id=Archlinux
grub-mkconfig -o /boot/grub/grub.cfg
```

If you can see some `img` file generated, it means the grub boot loader file are successful creatted.

### 17. Reboot

```bash
exit
umount -R /mnt
reboot
```
Use `uname -a` to view the Version of Arch linux.

![Arch_linux Version](5.png) 














